interface Response {
    message: string | string[];

}

export const getErrorMessage = (response: Response) => {
    if (response.message) {
        if (Array.isArray(response.message)) {
            return formatErrorMessage(response.message[0]);
        }
        return formatErrorMessage(response.message);
    }
    return "Unknown error occurred";
}


const formatErrorMessage = (message: string) => {
    return message.charAt(0).toUpperCase() + message.slice(1);
}