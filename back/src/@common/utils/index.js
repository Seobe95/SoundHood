"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueFileName = getUniqueFileName;
var path_1 = require("path");
function getUniqueFileName(file, id) {
    var ext = (0, path_1.extname)(file.originalname);
    var fileName = (0, path_1.basename)(file.originalname, ext) + id + ext;
    return fileName;
}
