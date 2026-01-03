/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-23 08:45:10
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-16 15:17:40
 * @FilePath: \project\src\utils\jsencrypt.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import JSEncrypt from 'jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMP7Oh7Iwm/3Iv5nrUGHvnVxVuHASiXkCgIwj0F2ARKFB2ML6Z1/g6iVqwHgBl44binqh02f05uktlojqzkjANECAwEAAQ=='

const privateKey =
  'MIIBpjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQI743ek+XtazECAggA' +
  'MBQGCCqGSIb3DQMHBAj7pSNWYV8dngSCAWAgcdaw5UnpgEaaSqLW1XIjsIeaEC1Q\n' +
  'b1UXvTStRbPeNpGKWrdRiAbtNqMHTfMXTZkHJlGu8hkiIMRFNj6bhl9kHtERsRf7\n' +
  'bgqWQXSO6PKVzAufOW5WGvD0oEdbVvpXwWdy3EALQSncCPkMHzCiFVPUR4WpmnBl\n' +
  'gNMujRnNYXk36qKxBKt8yHCkIm678MsOz508pcnt81wz0q7CZ5n+j27OjcspJjR9\n' +
  '8Hwv2RFLAxwZhAJ3+e3yQL5k5qYLBDcwr6m6SdMSvuaH+pdKvSrsVHj7iqEvmElv\n' +
  'SrCAJPU9MatfUhXSVq71VcETo9YbcTuUfvh7+nCTR9Ag1jGLNJ42XePl8I5jtc7W\n' +
  'SxyRxCiTwmp+BZzKPQ9CjPzZNtjj4H+FFioi8JQxlpNRVTP27xGxg5KKdmLfB3oe\n' +
  'US3JYA4n/HVX4pcun/eX6umPUPX1cN1wfhcKqBvGzsY653wk73ccBlI+'

// 加密
export const encrypt = (txt: any) => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export const decrypt = (txt: any) => {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
