import store from "@/store";
export default {
  async getWorkflow(tenant) {
    let tenantId = tenant || store.getters["tenants/tenant"].id;
    try {
      const workflow = await ApiClient.get(`api/${tenantId}/workflow`, {
        withCredentials: true,
      });
      return workflow.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getWorkflowStates(tenant) {
    let tenantId = tenant || store.getters["tenants/tenant"].id;
    try {
      const workflow = await ApiClient.get(`api/${tenantId}/workflow/states`, {
        withCredentials: true,
      });
      return workflow.data;
    } catch (error) {
      console.error(error);
    }
  },
  async createWorkflow(workflow, tenant) {
    let tenantId = tenant || store.getters["tenants/tenant"].id;
    try {
      const newWorkflow = await ApiClient.post(
        `api/${tenantId}/workflow`,
        workflow,
        {
          withCredentials: true,
        }
      );
      return newWorkflow.data;
    } catch (error) {
      console.error(error);
    }
  },

  async updateWorkflow(workflow, tenant) {
    let tenantId = tenant || store.getters["tenants/tenant"].id;
    try {
      const updatedWorkflow = await ApiClient.put(
        `api/${tenantId}/workflow`,
        workflow,
        {
          withCredentials: true,
        }
      );
      return updatedWorkflow.data;
    } catch (error) {
      console.error(error);
    }
  },
  async updateTask(
    { taskId, operation, destination, newIndex, oldIndex },
    tenant
  ) {
    let tenantId = tenant || store.getters["tenants/tenant"].id;
    try {
      const workflow = await ApiClient.put(
        `api/${tenantId}/workflow/task`,
        {
          taskId: taskId,
          operation: operation,
          destination: destination,
          newIndex: newIndex,
          oldIndex: oldIndex || null,
        },
        {
          withCredentials: true,
        }
      );
      return workflow.data;
    } catch (error) {
      console.error(error);
    }
  },

  async archiveTask({ taskId }, tenant) {
    let tenantId = tenant || store.getters["tenants/tenant"].id;
    try {
      const workflow = await ApiClient.put(
        `api/${tenantId}/workflow/archive`,
        {
          taskId: taskId,
        },
        {
          withCredentials: true,
        }
      );
      return workflow.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getBacklog(tenant) {
    let tenantId = tenant || store.getters["tenants/tenant"].id;
    try {
      const backlog = await ApiClient.get(`api/${tenantId}/workflow/backlog`, {
        withCredentials: true,
      });
      return backlog.data;
    } catch (error) {
      console.error(error);
    }
  },
};
