
import { Buffer } from 'buffer';
export const base64Encode = (data: string) => {
  let encodedData = Buffer.from(data, 'utf8').toString('base64');
  encodedData = encodedData.replace(/\//g, '_').replace(/\+/g, '-');
  return encodedData;
};

export const base64Decode = (data: string) => {
  let decodedData = data.replace(/_/g, '/').replace(/-/g, '+');
  decodedData = Buffer.from(decodedData, 'base64').toString('utf8');
  return decodedData;
  
};