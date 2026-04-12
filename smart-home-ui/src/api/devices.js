import apiRequest from "./client";

export const getDevices = async () => {
  return apiRequest("/devices");
};

export const createDevice = async (deviceData) => {
  return apiRequest("/devices", {
    method: "POST",
    body: JSON.stringify(deviceData),
  });
};

export const updateDevice = async (id, deviceData) => {
  return apiRequest(`/devices/${id}`, {
    method: "PATCH",
    body: JSON.stringify(deviceData),
  });
};

export const deleteDevice = async (id) => {
  return apiRequest(`/devices/${id}`, {
    method: "DELETE",
  });
};