import apiRequest from "./client";

export const getRooms = async () => {
  return apiRequest("/rooms");
};

export const createRoom = async (roomData) => {
  return apiRequest("/rooms", {
    method: "POST",
    body: JSON.stringify(roomData),
  });
};

export const updateRoom = async (id, roomData) => {
  return apiRequest(`/rooms/${id}`, {
    method: "PATCH",
    body: JSON.stringify(roomData),
  });
};

export const deleteRoom = async (id) => {
  return apiRequest(`/rooms/${id}`, {
    method: "DELETE",
  });
};

export const getRoomDevices = async (id) => {
  return apiRequest(`/rooms/${id}/devices`);
};