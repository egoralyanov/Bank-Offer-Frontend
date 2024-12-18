export interface BankOffer {
    pk: number;
    name: string;
    description: string;
    bonus: string;
    fact: string;
    cost: number;
    imageUrl?: string;
}

export const getOffer = async (
    id: number | string
): Promise<BankOffer> => {
    return fetch(`/api/offers/${id}/`).then(
        (response) => response.json()
    );
};

export interface BankOffersResult {
    offers: BankOffer[];
    draft_application_id: number;
    application_offers_counter: number
}

export const getOffers = async (offer_name = ""): Promise<BankOffersResult> => {
    return fetch(`/api/offers/?offer_name=${offer_name}`).then(
        (response) => response.json()
    );
};

// export const addOfferToDraft = async (offer_id: number): Promise<Boolean> => {
//     return fetch(`/api/applications/draft/`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({offer_id: offer_id})
//     })
//     .then(
//         (response) => response.ok
//     );
// };
