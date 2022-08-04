#! /usr/bin/env node

const fs = require('fs');
const { dto } = require('./cli');
const { Exporter } = require('./exporter');
const { Importer } = require('./importer');

const rawData = fs.readFileSync(dto.input).toString();
const Fabric = dto.type === 'md' ? Importer : Exporter;
const outputData = new Fabric(dto).execute(rawData);
fs.writeFileSync(dto.output, outputData);
