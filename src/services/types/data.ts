export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniq_id?: string;
}

export type TIngredientsById = {
    [id: string]: TIngredient
}

export type TForgotPasswordData = {
    success: boolean;
    message?: string;
}

export type TUserLogin = {
    email: string;
    name: string;
};

export type TAuthUser = {
    email: string;
    password: string;
};

export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    owner?: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    }
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price?: number;
}

export type TWebSocket = {
    wsInit: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
};

export type TUser = TUserLogin & {
    password: string | null
}

export type TResetPassword = {
    code: string;
    password: string;
}

export type RegistrationTexts = {
    text: string;
    link: string;
    link_text: string;
}