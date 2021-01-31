import axios from 'axios';
import { AxiosHttpHelper } from './axios-http-helper';

jest.mock('axios');

describe('AxiosHttpHelper class', () => {
  let axiosHelper: AxiosHttpHelper;

  beforeEach(() => {
    axiosHelper = new AxiosHttpHelper();
  });

  it('should call axios with correct params', async (done) => {
    // Url Address axios will use
    const urlExample = 'any_url';
    // headers that will be set to call specific API
    const headersExample = {
      header_property1: 'any_value',
      header_property2: 'any_value',
    };
    // how axios need to receive headers as config
    const expectedHeader = {
      headers: {
        header_property1: 'any_value',
        header_property2: 'any_value',
      },
    };
    jest.spyOn(axios, 'get');
    await axiosHelper.get(urlExample, headersExample);
    expect(axios.get).toHaveBeenCalledWith(urlExample, expectedHeader);
    done();
  });

  it('should return any api response', async (done) => {
    // Url Address axios will use
    const urlExample = 'any_url';
    // headers that will be set to call specific API
    const headersExample = {
      header_property1: 'any_value',
      header_property2: 'any_value',
    };
    // mocked response from axios request
    const response = {
      value: 'any_response',
    };

    jest.spyOn(axios, 'get').mockResolvedValueOnce(response);
    const apiResponse = await axiosHelper.get(urlExample, headersExample);
    expect(apiResponse).toEqual(response);
    done();
  });

  it('should throw if an unexpected error occurs', async (done) => {
    // Url Address axios will use
    const urlExample = 'any_url';
    // headers that will be set to call specific API
    const headersExample = {
      header_property1: 'any_value',
      header_property2: 'any_value',
    };
    // mocked error for axios request
    jest
      .spyOn(axios, 'get')
      .mockRejectedValue(new Error('Something Unexpected'));
    const errorResponse = axiosHelper.get(urlExample, headersExample);
    await expect(errorResponse).rejects.toThrowError('Something Unexpected');
    done();
  });
});
