/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class FetchInterceptor {
	public static unsubscribe: () => void;
	private static instance: FetchInterceptor;

	constructor() {
		if (!FetchInterceptor.instance) {
			FetchInterceptor.instance = this;
		}
		return FetchInterceptor.instance;
	}

	public static get STATUS_CODE() {
		return {
			UNAUTHORIZED: 401,
			NOT_FOUND: 404,
		};
	}

	static registerFetchInterceptor() {
		const { fetch: originalFetch } = window;
		window.fetch = async (...args) => {
			try {
				return await originalFetch
					.apply(window, args)
					.then((res) => {
						return this.statusCodeHandlers(res);
					})
					.catch((e) => {
						return Promise.reject(e);
					});
			} catch (err) {
				return Promise.reject(err);
			}
		};
	}

	public static get CONTEXT_PATH(): string {
		return window['CONTEXT_PATH'];
	}

	static registerInterceptors() {
		this.registerFetchInterceptor();
		this.registerXHRInterceptor();
	}

	static registerXHRInterceptor() {
		const origOpen = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function (...args) {
			this.addEventListener('load', function () {
				return FetchInterceptor.statusCodeHandlers(this);
			});
			origOpen.apply(this, args);
		};
	}

	private static statusCodeHandlers<T extends { status: number }>(res: T): T | Promise<T> {
		if (res.status === this.STATUS_CODE.UNAUTHORIZED) {
			window.location.replace(`${this.CONTEXT_PATH}/login`);
			return Promise.reject(res);
		}
		if (res.status === this.STATUS_CODE.NOT_FOUND) {
			return Promise.reject(res);
		}
		return res;
	}
}

export default FetchInterceptor;
