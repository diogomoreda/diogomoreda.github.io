const ApiService = {
	fetchData: async <T>(url: string): Promise<T> => {
		try {
			const response = await fetch(url, {headers: { 'Content-Type': 'application/json' } });
			if (!response.ok) throw new Error(`Failed to fetch data. Status: ${response.status}`);
			const result: T = await response.json();
			return result;
		} catch (error:any) {
			throw new Error(`Error fetching data: ${error.message}`);
		}
	},
};

export default ApiService;