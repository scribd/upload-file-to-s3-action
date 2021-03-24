# Upload File to S3 Action

Github Action to upload individual files to S3.

## Example usage

```yaml
- uses: scribd/upload-file-to-s3-action@v2
  with:
    path: build/outputs/release/built-app.apk
    destination: myapp.apk
    bucket: my-bucket
    access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Inputs

### `path`

The filepath to upload.

### `destination`

The destination filepath. **Optional, defaults to `path`**

### `bucket`

The bucket to place the file in.

### `access-key-id`

The AWS access key id.

### `secret-access-key`

The AWS secret access key.

### `region`

The AWS region to use. **Defaults to `us-east-1`.**

### `permissions`

The ACL permissions to set for the file. **Defaults to `public-read`.**

