export const calculateRatings = (product) => {
    let obj = { one: 0, two: 0, three: 0, four: 0, five: 0 };
    product?.reviews?.forEach((review) => {
        switch (review.rating) {
            case 1:
                obj.one = obj.one + 1;
                break;
            case 2:
                obj.two = obj.two + 1;
                break;
            case 3:
                obj.three = obj.three + 1;
                break;
            case 4:
                obj.four = obj.one + 1;
                break;
            case 5:
                obj.five = obj.five + 1;
                break;
            default:
                console.log("irralevent");
        }
    });
    let rating =
        (obj.one * 1 +
            obj.two * 2 +
            obj.three * 3 +
            obj.four * 4 +
            obj.five * 5) /
        (obj.one + obj.two + obj.three + obj.four + obj.five);
    return rating;
};

export const calculateRatingsForSparePart = (product) => {
    let obj = { one: 0, two: 0, three: 0, four: 0, five: 0 };
    product?.pRatingsReviews?.forEach((review) => {
        switch (review.rating) {
            case 1:
                obj.one = obj.one + 1;
                break;
            case 2:
                obj.two = obj.two + 1;
                break;
            case 3:
                obj.three = obj.three + 1;
                break;
            case 4:
                obj.four = obj.one + 1;
                break;
            case 5:
                obj.five = obj.five + 1;
                break;
            default:
                console.log("irralevent");
        }
    });
    let rating =
        (obj.one * 1 +
            obj.two * 2 +
            obj.three * 3 +
            obj.four * 4 +
            obj.five * 5) /
        (obj.one + obj.two + obj.three + obj.four + obj.five);
    return rating;
};