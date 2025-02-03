import axios, { AxiosResponse } from 'axios';

const header = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImRlc2NyaXB0aW9uIjoiIiwiYXZhdGFyIjoiIiwidXNlcm5hbWUiOiIxMjMiLCJpYXQiOjE3MzYxOTI4NzksImV4cCI6MTczNjE5MjkzOX0.z5FXutt9WfJpX_3sa-31NsfJTP4aBDT1HiKrqD6nd5c',
  },
};

export async function getRequest(
  prefix: Prefixes,
  method: GetMethods,
  byFind?: number | string,
): Promise<AxiosResponse> {
  const response: AxiosResponse = await axios.get(
    `/api/${prefix}/${method}/${byFind ? byFind : ''}`,
    header,
  );

  return response;
}

export async function postRequest(
  prefix: Prefixes,
  method: PostMethods,
  data: any,
): Promise<AxiosResponse> {
  const response: AxiosResponse = await axios.post(
    `/api/${prefix}/${method}`,
    data,
    header,
  );

  return response;
}

export async function deleteRequest(
  prefix: Prefixes,
  method: DeleteMethods,
  id: number,
): Promise<AxiosResponse> {
  const response: AxiosResponse = await axios.delete(
    `/api/${prefix}/${method}/${id}`,
    header,
  );

  return response;
}

export async function patchRequest(
  prefix: Prefixes,
  method: PatchMethods,
  id: number,
  data: any,
): Promise<AxiosResponse> {
  const response: AxiosResponse = await axios.patch(
    `/api/${prefix}/${method}/${id}`,
    data,
    header,
  );

  return response;
}
