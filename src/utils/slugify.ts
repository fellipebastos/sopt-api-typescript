import slugify from 'slugify';

export default function (value: string): string {
  return slugify(value, {
    lower: true,
  });
}
