const fs = require('fs');
const path = require('path');
const env = require('../config/env');
const { remoteFileExists } = require('../config/utils/remoteFileExists');

/**
 * Ports of this codebase's original file_exists()-derived "is this image really
 * there" check assumed every real media file lived only on an external reference
 * site (see remoteFileExists.js). That's still where every URL this app hands
 * back points - https://projecttemp.weblink4you.com/indicam_electronics_olD/... -
 * but env.uploadDir (per explicit instruction) is now a path on a filesystem
 * shared with that same server: /home/projecttemp/public_html/indicam_electronics_olD/
 * uploaded_files is literally that domain's own webroot for this media. So a
 * file this app just wrote to env.uploadDir/<dir>/<filename> is *immediately*
 * present at the external URL too - checking local disk is just a fast,
 * reliable, no-network stand-in for asking that domain over HTTP, not a
 * different location. The remote HTTP check remains only as a fallback for the
 * (hopefully rare) case where the local path isn't reachable for some reason
 * but the file is still being served fine.
 */
async function resolveMediaUrl(req, dir, filename, noImagePath, externalBaseUrl) {
  if (!filename) return noImagePath;

  const remoteUrl = `${externalBaseUrl}uploaded_files/${dir}/${filename}`;

  const localPath = path.join(env.uploadDir, dir, filename);
  if (fs.existsSync(localPath)) {
    return remoteUrl;
  }

  return (await remoteFileExists(remoteUrl)) ? remoteUrl : noImagePath;
}

module.exports = { resolveMediaUrl };
