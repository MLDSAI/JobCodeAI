export const formatJSONResponse = (response: Record<string, unknown>) => {
	return {
	  headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': '*'
	  },
	  statusCode: 200,
	  body: JSON.stringify(response)
	}
  }