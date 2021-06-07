var express = require('express');
var app = express();
var path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
var crypto = require('crypto');
const { body, param, validationResult } = require('express-validator');