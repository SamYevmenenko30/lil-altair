import { ValidateFunction } from 'ajv';
import type { Type } from './plugins-yaml-manifest';
declare let v: ValidateFunction<Type>;
export default v;
