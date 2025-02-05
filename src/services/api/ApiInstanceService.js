class ApiInstanceService {
  static async getPublicInstance() {
    const response = await ApiClient.get("api/instances/public", {
      withCredentials: true,
    });
    return response.data;
  }
}

export default ApiInstanceService;
