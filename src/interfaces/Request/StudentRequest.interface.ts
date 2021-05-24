import { Student } from '../Student';

import { UploadParams } from './UploadRequest.interface';

export interface StudentParams extends UploadParams {}

export interface StudentBody extends Student{}
