
import { Transform } from 'class-transformer';

/** 단일 인자를 배열로 변환 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const FromSingleToArray = () => Transform(({ value }) => (value === undefined || Array.isArray(value)) ? value : [ value ]);