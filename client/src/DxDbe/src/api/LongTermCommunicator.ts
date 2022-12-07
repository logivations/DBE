/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class LongTermCommunicator {
	private evtSource: EventSource;

	constructor(public contextPath: string) {}

	private get baseLongTermPath() {
		return `${this.contextPath}/api/longTerm/startLongTermAction`;
	}

	private static createEventName(event) {
		return `${event}Status`;
	}

	private static defineEventSourceEvent(evtSource, event, callback) {
		if (typeof callback === 'function') {
			evtSource.addEventListener(event, callback);
		}
	}

	public startLongTerm(longTermOperationId) {
		const evtSource = this.createLongTermStream(encodeURI(longTermOperationId));
		return new Promise((resolve, reject) => {
			const params = {
				running: ({ data }) => {
					this.safeParseResult(data);
				},
				completed: ({ data }) => {
					evtSource.close();
					resolve(this.safeParseResult(data));
				},
				error: ({ data }) => {
					evtSource.close();
					reject(this.safeParseResult(data));
				},
				cancelled: ({ data }) => {
					evtSource.close();
					reject(this.safeParseResult(data));
				},
				cancelling: ({ data }) => {
					evtSource.close();
					reject(this.safeParseResult(data));
				},
			};

			LongTermCommunicator.defineEventSourceEvent(
				evtSource,
				LongTermCommunicator.createEventName('running'),
				params['running'],
			);
			LongTermCommunicator.defineEventSourceEvent(
				evtSource,
				LongTermCommunicator.createEventName('completed'),
				params['completed'],
			);
			LongTermCommunicator.defineEventSourceEvent(
				evtSource,
				LongTermCommunicator.createEventName('error'),
				params['error'],
			);
			LongTermCommunicator.defineEventSourceEvent(
				evtSource,
				LongTermCommunicator.createEventName('cancelled'),
				params['cancelled'],
			);
			LongTermCommunicator.defineEventSourceEvent(
				evtSource,
				LongTermCommunicator.createEventName('cancelling'),
				params['cancelling'],
			);
		});
	}

	private createLongTermStream(longTermOperationId: string) {
		return new EventSource(`${this.baseLongTermPath}?longTermOperationId=${longTermOperationId}`, {
			withCredentials: true,
		});
	}

	private safeParseResult(data: string) {
		const safeParse = (json) => {
			try {
				return typeof json === 'string' ? JSON.parse(json) : json;
			} catch (e) {}
		};

		const parsedJson = safeParse(data);
		return safeParse(parsedJson);
	}
}

export default LongTermCommunicator;
