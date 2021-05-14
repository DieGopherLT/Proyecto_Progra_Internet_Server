import { StudentAttributes } from '../../model/Student';

import { UploadParams } from './UploadRequest.interface';

export interface StudentParams extends UploadParams {}

export interface StudentBody extends StudentAttributes{}
