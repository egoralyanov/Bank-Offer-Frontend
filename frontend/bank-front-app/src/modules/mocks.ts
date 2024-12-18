import { BankOffer, BankOffersResult } from "./BankOfferApi";

export const OFFER_MOCK: BankOffer = {
    pk: 1,
    name: "mock-Эквайринг",
    description: "Подключение эквайринга для малого и среднего бизнеса – это возможность принимать безналичную оплату в торговых точках, при доставке, в интернете",
    bonus: "Услуги карт платежных систем МИР, Visa, Mastercard и UnionPay, выпущенные российскими эмитентами",
    fact: "Бесплатное подключение",
    cost: 1000,
    imageUrl: "http://127.0.0.1:9000/bank-offer/1.png"
};

export const OFFERS_MOCK: BankOffersResult = {
    offers: [
        {
            pk: 1,
            name: "mock-Эквайринг",
            description: "Подключение эквайринга для малого и среднего бизнеса – это возможность принимать безналичную оплату в торговых точках, при доставке, в интернете",
            bonus: "Услуги карт платежных систем МИР, Visa, Mastercard и UnionPay, выпущенные российскими эмитентами",
            fact: "Бесплатное подключение",
            cost: 1000,
            imageUrl: "http://127.0.0.1:9000/bank-offer/1.png"
        },
        {
            pk: 2,
            name: "mock-РКО",
            description: "РКО необходимо, чтобы проводить операции по получению и переводу денежных средств контрагентам, в бюджет, сотрудникам",
            bonus: "Бонусы за открытие расчетного счета: скидки на бухгалтерские услуги и бесплатные переводы между счетами",
            fact: "Бухгалтерия для бизнеса",
            cost: 5000,
            imageUrl: "http://127.0.0.1:9000/bank-offer/3.png"
        }
    ],
    draft_application_id: 0,
    application_offers_counter: 0
};
