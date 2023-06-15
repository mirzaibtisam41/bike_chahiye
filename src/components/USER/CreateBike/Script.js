export const createObject = (User, Edit, values) => {
    const formData = new FormData();
    formData.append("userID", User?._id);
    formData.append("modelName", values.Model);
    formData.append("brand", values.Brand);
    formData.append("regYear", values["Registration Year"]);
    formData.append("bikeNumber", values["Bike Number"]);
    formData.append("category", values.Category);
    formData.append("finalPrice", values.Price);
    formData.append("totalUsed", values["Total Used"]);
    formData.append("city", values.City);
    formData.append("detail", values["Bike Detail"]);
    for (const key in values["Bike Picture"]) {
        formData.append("usedBikePic", values["Bike Picture"][key]);
    }

    const obj = {};
    obj.useBikeID = Edit;
    if (values.Model) obj.modelName = values.Model;
    if (values.Brand) obj.brand = values.Brand;
    if (values.Category) obj.category = values.Category;
    if (values.Price) obj.finalPrice = values.Price;
    if (values.City) obj.city = values.City;
    if (values["Registration Year"]) obj.regYear = values["Registration Year"];
    if (values["Total Used"]) obj.totalUsed = values["Total Used"];
    if (values["Bike Number"]) obj.bikeNumber = values["Bike Number"];
    if (values["Bike Detail"]) obj.detail = values["Bike Detail"];

    return Edit ? obj : formData;
}