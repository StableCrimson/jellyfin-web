
/**
 * Module for building cards from item data.
 * @module components/cardBuilder/peopleCardBuilder
 */

import { BaseItemDtoImageBlurHashes, BaseItemPerson } from '@jellyfin/sdk/lib/generated-client';
import { CardOptions } from 'types/cardOptions';
import cardBuilder from './cardBuilder';

type PeopleCardOptions = {
    imageBlurHashes?: BaseItemDtoImageBlurHashes
} & CardOptions;

export function buildPeopleCards(items: BaseItemPerson[], options: PeopleCardOptions) {
    options = {
        cardLayout: false,
        centerText: true,
        showTitle: true,
        cardFooterAside: 'none',
        showPersonRoleOrType: true,
        cardCssClass: 'personCard',
        defaultCardImageIcon: 'person',
        ...options
    };
    cardBuilder.buildCards(items, options);
}

export default {
    buildPeopleCards: buildPeopleCards
};
