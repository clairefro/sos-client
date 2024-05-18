
// TODO: ATTRIBUTION 
// https://www.dicebear.com/licenses

import { createAvatar } from '@dicebear/core';
import { lorelei, identicon, openPeeps, botttsNeutral } from '@dicebear/collection';
import { pluck } from './pluck';

const collections = [lorelei, identicon, openPeeps, botttsNeutral]

function randomAvatarDataUri(seed) {
    const selectedCollection = pluck(collections)

    const avatar = createAvatar(selectedCollection, {
        seed
    });

    const data = avatar.toDataUriSync();
    return data
}

export { randomAvatarDataUri }