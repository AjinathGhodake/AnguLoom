import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public randomIdGenerator() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
