import {ListItem, Button, Left, Right, Body, Text} from 'native-base';
import React, {Component} from 'react';
import {formateDate} from '../helper';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function getDecoded() {
  console.log('fetchReceiptsData method');

  AsyncStorage.getItem('token', (err, result) => {
    const decoded = jwt_decode(result);
    console.log('Decoded =>', decoded);
    return decoded;
  });
}
