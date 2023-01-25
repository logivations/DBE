/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2021
 ******************************************************************************/

class JwtApi {
	private static instance: JwtApi;

	private static get ACCESS_EXPIRE(): string {
		return 'AccessExpireDate';
	}

	private static get REFRESH_EXPIRE(): string {
		return 'RefreshExpireDate';
	}

	private static get ignoreTokens(): boolean {
		return window['IGNORE_TOKENS'];
	}

	private static get CONTEXT_PATH(): boolean {
		return window['CONTEXT_PATH'];
	}

	private static get isTokensDatesExpire(): boolean {
		return [JwtApi.ACCESS_EXPIRE, JwtApi.REFRESH_EXPIRE].some((storageName) => {
			const expireDate = parseInt(localStorage.getItem(storageName), 10);

			if (!isNaN(expireDate)) {
				const dateNow = +Date.now();
				return expireDate < dateNow;
			} else {
				return true;
			}
		});
	}

	private static setTokenExpirationDate(expired: string, storageName: string): void {
		const fiveMinutes = 5 * 60000;
		const expireDate = Number(expired) - fiveMinutes;

		localStorage.setItem(storageName, String(expireDate));
	}

	constructor() {
		if (!JwtApi.instance) {
			JwtApi.instance = this;
		}
		return JwtApi.instance;
	}

	public setTokensExpirationDates(response): void {
		const { accessExpired, refreshExpired } = response;

		JwtApi.setTokenExpirationDate(accessExpired, JwtApi.ACCESS_EXPIRE);
		JwtApi.setTokenExpirationDate(refreshExpired, JwtApi.REFRESH_EXPIRE);
	}

	public getTokens(): Promise<any> {
		if (JwtApi.isTokensDatesExpire && !JwtApi.ignoreTokens && false) {
			return new Promise((resolve, reject) => {
				fetch(`${JwtApi.CONTEXT_PATH}/api/auth/token`)
					.then((res) => res.json())
					.then(
						(response) => {
							this.setTokensExpirationDates(response);
							resolve(true);
						},
						(error) => {
							if (error.responseJSON) {
								// tslint:disable-next-line:no-console
								console.error(error.responseJSON.errorMessage);
								reject(error.responseJSON.errorMessage);
							} else {
								reject(error);
							}
						},
					);
			});
		} else {
			return Promise.resolve(true);
		}
	}
}

export default new JwtApi();
