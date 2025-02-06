class ApiInstanceService {
  static async getPublicInstance() {
    const response = await ApiClient.get("api/instances/public", {
      withCredentials: true,
    });
    return response.data;
  }
  static async getInstance() {
    const response = await ApiClient.get("api/instances", {
      withCredentials: true,
    });
    return response.data;
  }

  static async updateInstance(instance) {
    const response = await ApiClient.put("api/instances", instance,{
      withCredentials: true,
    });
    return response.data;
  }
}

export default ApiInstanceService;
