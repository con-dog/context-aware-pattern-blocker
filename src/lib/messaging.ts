export const messageUtils = {
	async sendMessage<T>(message: T) {
		try {
			await chrome.runtime.sendMessage(message);
		} catch (error) {
			console.error("Error sending message to background script:", error);
			throw error;
		}
	},
	async sendMessageWithResponse<T, R>(message: T): Promise<R> {
		try {
			const response = await chrome.runtime.sendMessage(message);
			return response as R;
		} catch (error) {
			console.error("Error sending message to background script:", error);
			throw error;
		}
	},
	async addMessageListener<T>(callback: (message: T) => void) {
		chrome.runtime.onMessage.addListener((message) => {
			callback(message as T);
		});
	},
	async addMessageListenerWithResponse<T, R>(
		callback: (message: T, sendResponse: (response: R) => void) => void,
	) {
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			callback(message as T, sendResponse);
		});
	},
};
