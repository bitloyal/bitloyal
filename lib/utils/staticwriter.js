/*!
 * staticwriter.js - buffer writer for bcoin
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

const assert = require('assert');
const encoding = require('./encoding');
const digest = require('../crypto/digest');

/**
 * Statically allocated buffer writer.
 * @alias module:utils.StaticWriter
 * @constructor
 * @param {Number} size
 */

function StaticWriter(size) {
  if (!(this instanceof StaticWriter))
    return new StaticWriter(size);

  this.data = Buffer.allocUnsafe(size);
  this.written = 0;
}

/**
 * Allocate and render the final buffer.
 * @param {Boolean?} keep - Do not destroy the writer.
 * @returns {Buffer} Rendered buffer.
 */

StaticWriter.prototype.render = function render(keep) {
  const data = this.data;

  assert(this.written === data.length);

  if (!keep)
    this.destroy();

  return data;
};

/**
 * Get size of data written so far.
 * @returns {Number}
 */

StaticWriter.prototype.getSize = function getSize() {
  return this.written;
};

/**
 * Seek to relative offset.
 * @param {Number} offset
 */

StaticWriter.prototype.seek = function seek(offset) {
  this.written += offset;
};

/**
 * Destroy the buffer writer.
 */

StaticWriter.prototype.destroy = function destroy() {
  this.data = null;
  this.written = null;
};

/**
 * Write uint8.
 * @param {Number} value
 */

StaticWriter.prototype.writeU8 = function writeU8(value) {
  this.written = this.data.writeUInt8(value, this.written, true);
};

/**
 * Write uint16le.
 * @param {Number} value
 */

StaticWriter.prototype.writeU16 = function writeU16(value) {
  this.written = this.data.writeUInt16LE(value, this.written, true);
};

/**
 * Write uint16be.
 * @param {Number} value
 */

StaticWriter.prototype.writeU16BE = function writeU16BE(value) {
  this.written = this.data.writeUInt16BE(value, this.written, true);
};

/**
 * Write uint32le.
 * @param {Number} value
 */

StaticWriter.prototype.writeU32 = function writeU32(value) {
  this.written = this.data.writeUInt32LE(value, this.written, true);
};

/**
 * Write uint32be.
 * @param {Number} value
 */

StaticWriter.prototype.writeU32BE = function writeU32BE(value) {
  this.written = this.data.writeUInt32BE(value, this.written, true);
};

/**
 * Write uint64le.
 * @param {Number} value
 */

StaticWriter.prototype.writeU64 = function writeU64(value) {
  this.written = encoding.writeU64(this.data, value, this.written);
};

/**
 * Write uint64be.
 * @param {Number} value
 */

StaticWriter.prototype.writeU64BE = function writeU64BE(value) {
  this.written = encoding.writeU64BE(this.data, value, this.written);
};

/**
 * Write uint64le.
 * @param {BN} value
 */

StaticWriter.prototype.writeU64BN = function writeU64BN(value) {
  assert(false, 'Not implemented.');
};

/**
 * Write uint64be.
 * @param {BN} value
 */

StaticWriter.prototype.writeU64BEBN = function writeU64BEBN(value) {
  assert(false, 'Not implemented.');
};

/**
 * Write int8.
 * @param {Number} value
 */

StaticWriter.prototype.writeI8 = function writeI8(value) {
  this.written = this.data.writeInt8(value, this.written, true);
};

/**
 * Write int16le.
 * @param {Number} value
 */

StaticWriter.prototype.writeI16 = function writeI16(value) {
  this.written = this.data.writeInt16LE(value, this.written, true);
};

/**
 * Write int16be.
 * @param {Number} value
 */

StaticWriter.prototype.writeI16BE = function writeI16BE(value) {
  this.written = this.data.writeInt16BE(value, this.written, true);
};

/**
 * Write int32le.
 * @param {Number} value
 */

StaticWriter.prototype.writeI32 = function writeI32(value) {
  this.written = this.data.writeInt32LE(value, this.written, true);
};

/**
 * Write int32be.
 * @param {Number} value
 */

StaticWriter.prototype.writeI32BE = function writeI32BE(value) {
  this.written = this.data.writeInt32BE(value, this.written, true);
};

/**
 * Write int64le.
 * @param {Number} value
 */

StaticWriter.prototype.writeI64 = function writeI64(value) {
  this.written = encoding.writeI64(this.data, value, this.written);
};

/**
 * Write int64be.
 * @param {Number} value
 */

StaticWriter.prototype.writeI64BE = function writeI64BE(value) {
  this.written = encoding.writeI64BE(this.data, value, this.written);
};

/**
 * Write int64le.
 * @param {BN} value
 */

StaticWriter.prototype.writeI64BN = function writeI64BN(value) {
  assert(false, 'Not implemented.');
};

/**
 * Write int64be.
 * @param {BN} value
 */

StaticWriter.prototype.writeI64BEBN = function writeI64BEBN(value) {
  assert(false, 'Not implemented.');
};

/**
 * Write float le.
 * @param {Number} value
 */

StaticWriter.prototype.writeFloat = function writeFloat(value) {
  this.written = this.data.writeFloatLE(value, this.written, true);
};

/**
 * Write float be.
 * @param {Number} value
 */

StaticWriter.prototype.writeFloatBE = function writeFloatBE(value) {
  this.written = this.data.writeFloatBE(value, this.written, true);
};

/**
 * Write double le.
 * @param {Number} value
 */

StaticWriter.prototype.writeDouble = function writeDouble(value) {
  this.written = this.data.writeDoubleLE(value, this.written, true);
};

/**
 * Write double be.
 * @param {Number} value
 */

StaticWriter.prototype.writeDoubleBE = function writeDoubleBE(value) {
  this.written = this.data.writeDoubleBE(value, this.written, true);
};

/**
 * Write a varint.
 * @param {Number} value
 */

StaticWriter.prototype.writeVarint = function writeVarint(value) {
  this.written = encoding.writeVarint(this.data, value, this.written);
};

/**
 * Write a varint.
 * @param {BN} value
 */

StaticWriter.prototype.writeVarintBN = function writeVarintBN(value) {
  assert(false, 'Not implemented.');
};

/**
 * Write a varint (type 2).
 * @param {Number} value
 */

StaticWriter.prototype.writeVarint2 = function writeVarint2(value) {
  this.written = encoding.writeVarint2(this.data, value, this.written);
};

/**
 * Write a varint (type 2).
 * @param {BN} value
 */

StaticWriter.prototype.writeVarint2BN = function writeVarint2BN(value) {
  assert(false, 'Not implemented.');
};

/**
 * Write bytes.
 * @param {Buffer} value
 */

StaticWriter.prototype.writeBytes = function writeBytes(value) {
  if (value.length === 0)
    return;

  value.copy(this.data, this.written);

  this.written += value.length;
};

/**
 * Write bytes with a varint length before them.
 * @param {Buffer} value
 */

StaticWriter.prototype.writeVarBytes = function writeVarBytes(value) {
  this.writeVarint(value.length);
  this.writeBytes(value);
};

/**
 * Copy bytes.
 * @param {Buffer} value
 * @param {Number} start
 * @param {Number} end
 */

StaticWriter.prototype.copy = function copy(value, start, end) {
  const len = end - start;

  if (len === 0)
    return;

  value.copy(this.data, this.written, start, end);
  this.written += len;
};

/**
 * Write string to buffer.
 * @param {String} value
 * @param {String?} enc - Any buffer-supported encoding.
 */

StaticWriter.prototype.writeString = function writeString(value, enc) {
  if (value.length === 0)
    return;

  const size = Buffer.byteLength(value, enc);

  this.data.write(value, this.written, enc);

  this.written += size;
};

/**
 * Write a 32 byte hash.
 * @param {Hash} value
 */

StaticWriter.prototype.writeHash = function writeHash(value) {
  if (typeof value !== 'string') {
    assert(value.length === 32);
    this.writeBytes(value);
    return;
  }
  assert(value.length === 64); // TODO AssertionError [ERR_ASSERTION]: false == true [debug] (peer) Sending getheaders (hash=25c875518d7b373609f4a48d33844b38b82363378ba74919c4402ae2cec84702, stop=904aacdf0c4351299b675c1006a76aa4e9fcaafcc9ea5e58cd67764b346d87fb0x).
  this.data.write(value, this.written, 'hex');
  this.written += 32;
};

/**
 * Write a string with a varint length before it.
 * @param {String}
 * @param {String?} enc - Any buffer-supported encoding.
 */

StaticWriter.prototype.writeVarString = function writeVarString(value, enc) {
  if (value.length === 0) {
    this.writeVarint(0);
    return;
  }

  const size = Buffer.byteLength(value, enc);

  this.writeVarint(size);
  this.data.write(value, this.written, enc);

  this.written += size;
};

/**
 * Write a null-terminated string.
 * @param {String|Buffer}
 * @param {String?} enc - Any buffer-supported encoding.
 */

StaticWriter.prototype.writeNullString = function writeNullString(value, enc) {
  this.writeString(value, enc);
  this.writeU8(0);
};

/**
 * Calculate and write a checksum for the data written so far.
 */

StaticWriter.prototype.writeChecksum = function writeChecksum() {
  const data = this.data.slice(0, this.written);
  const hash = digest.hash256(data);
  hash.copy(this.data, this.written, 0, 4);
  this.written += 4;
};

/**
 * Fill N bytes with value.
 * @param {Number} value
 * @param {Number} size
 */

StaticWriter.prototype.fill = function fill(value, size) {
  assert(size >= 0);

  if (size === 0)
    return;

  this.data.fill(value, this.written, this.written + size);
  this.written += size;
};

/*
 * Expose
 */

module.exports = StaticWriter;
