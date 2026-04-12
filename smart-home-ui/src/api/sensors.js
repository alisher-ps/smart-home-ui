import apiRequest from "./client";

export const getSensors = async () => {
  return apiRequest("/sensors");
};

export const createSensor = async (sensorData) => {
  return apiRequest("/sensors", {
    method: "POST",
    body: JSON.stringify(sensorData),
  });
};

export const updateSensor = async (id, sensorData) => {
  return apiRequest(`/sensors/${id}`, {
    method: "PATCH",
    body: JSON.stringify(sensorData),
  });
};

export const deleteSensor = async (id) => {
  return apiRequest(`/sensors/${id}`, {
    method: "DELETE",
  });
};

export const getSensorReadings = async (id) => {
  return apiRequest(`/sensors/${id}/readings`);
};

export const createSensorReading = async (id, readingData) => {
  return apiRequest(`/sensors/${id}/readings`, {
    method: "POST",
    body: JSON.stringify(readingData),
  });
};