export const wrap_response = ({ response, code }) => {
	switch (code) {
		case 1:
			return {
				data: response,
				code,
				msg: 'Error'
			}
		case 200:
			return {
				data: response,
				code,
				msg: 'Success'
			}
	}
}
