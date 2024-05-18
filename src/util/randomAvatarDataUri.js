
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';


function randomAvatarDataUri(seed) {

    const avatar = createAvatar(lorelei, {
        seed
    });

    const data = avatar.toDataUriSync();
    return data
}

export { randomAvatarDataUri }