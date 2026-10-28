
const { eq, and, asc } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlCustomers } = require('../schema/wl-customers')
const { wlCategories } = require('../schema/wl-categories')
const { wlBanners } = require('../schema/wl-banners')
const {wlHeaderImages} = require('../schema/wl-header-images')
const { wlPartners } = require('../schema/wl-partners')
const { wlProducts } = require('../schema/wl-products')
const { wlTestimonials } = require('../schema/wl-testimonials')
const { wlProductsMedia } = require('../schema/wl-products-media')

const saveCustomerDeviceDetails = async ({
    app_id,
    device_id,
    app_type
}) => {
    const [existingCustomer] = await db
        .select({
            customersId: wlCustomers.customersId,
        })
        .from(wlCustomers)
        .where(
            and(
                eq(wlCustomers.appId, app_id),
                eq(wlCustomers.deviceId, device_id),
                eq(wlCustomers.appType, app_type),
            )
        )
        .limit(1)

    if (existingCustomer) {
        return await db
            .update(wlCustomers)
            .set({
                appId: app_id,
                deviceId: device_id,
                appType: app_type
            })
            .where(eq(wlCustomers.customersId, existingCustomer.customersId))
    }

    return await db.insert(wlCustomers).values({
        appId: app_id,
        deviceId: device_id,
        appType: app_type
    })
}

const getHomePageData = async () => {
    const [
        allCategories,
        banners,
        partners,
        featuredProducts,
        testimonials,
    ] = await Promise.all([
        db
            .select({
                categoryId: wlCategories.categoryId,
                catType: wlCategories.catType,
                catLinks: wlCategories.catLinks,
                categoryName: wlCategories.categoryName,
                friendlyUrl: wlCategories.friendlyUrl,
                categoryImage: wlCategories.categoryImage,
                categoryDescription: wlCategories.categoryDescription,
                parentId: wlCategories.parentId,
                isHome: wlCategories.isHome,
                isMenu: wlCategories.isMenu,
                isFooter: wlCategories.isFooter,
                sortOrder: wlCategories.sortOrder,
            })
            .from(wlCategories)
            .where(eq(wlCategories.status, '1'))
            .orderBy(asc(wlCategories.sortOrder)),

        db
            .select({
                bannerId: wlHeaderImages.id,
                bannerImage: wlHeaderImages.headerImage,
                bannerUrl: wlHeaderImages.headerUrl,
                lineOne: wlHeaderImages.lineOne,
                lineTwo: wlHeaderImages.lineTwo,
                lineThree: wlHeaderImages.lineThree,
            })
            .from(wlHeaderImages)
            .where(eq(wlHeaderImages.status, '1')),

        db
            .select({
                partnerId: wlPartners.partnerId,
                templeId: wlPartners.templeId,
                partnerName: wlPartners.partnerName,
                designation: wlPartners.designation,
                mobileNumber: wlPartners.mobileNumber,
                experience: wlPartners.experience,
                partnerImage: wlPartners.partnerImage,
                shortDesc: wlPartners.shortDesc,
                sortOrder: wlPartners.sortOrder,
            })
            .from(wlPartners)
            .where(eq(wlPartners.status, 1))
            .orderBy(asc(wlPartners.sortOrder)),

        db
            .select({
                productId: wlProducts.productId,
                categoryId: wlProducts.categoryId,
                categoryLinks: wlProducts.categoryLinks,
                productTitle: wlProducts.productTitle,
                productCode: wlProducts.productCode,
                referenceId: wlProducts.referenceId,
                productMake: wlProducts.productMake,
                productModel: wlProducts.productModel,
                year: wlProducts.year,
                friendlyUrl: wlProducts.friendlyUrl,
                productAlt: wlProducts.productAlt,
                productDescription: wlProducts.productDescription,
                productVideo: wlProducts.productVideo,
                isBest: wlProducts.isBest,
                isHot: wlProducts.isHot,
                isNew: wlProducts.isNew,
                isFeatured: wlProducts.isFeatured,
                isRecent: wlProducts.isRecent,
                productType: wlProducts.productType,
                productImage: wlProductsMedia.media,
            })
            .from(wlProducts)
            .leftJoin(
                wlProductsMedia,
                and(
                    eq(wlProductsMedia.productId, wlProducts.productId),
                    eq(wlProductsMedia.mediaType, 'photo'),
                    eq(wlProductsMedia.isDefault, 'Y')
                )
            )
            .where(
                and(
                    eq(wlProducts.isFeatured, 1),
                    eq(wlProducts.status, 1)
                )
            ),

        db
            .select({
                testimonialId: wlTestimonials.testimonialId,
                memId: wlTestimonials.memId,
                testimonialTitle: wlTestimonials.testimonialTitle,
                posterName: wlTestimonials.posterName,
                friendlyUrl: wlTestimonials.friendlyUrl,
                company: wlTestimonials.company,
                testimonialDescription:
                    wlTestimonials.testimonialDescription,
                photo: wlTestimonials.photo,
                postedDate: wlTestimonials.postedDate,
            })
            .from(wlTestimonials)
            .where(eq(wlTestimonials.status, 1)),
    ])


    const categories = allCategories.map((category) => ({
        ...category,
        subcategories: allCategories.filter(
            (subcategory) =>
                Number(subcategory.parentId) === Number(category.categoryId)
        ),
    }))


    return {
        categories,
        banners,
        partners,
        featuredProducts,
        testimonials,
    }
}

module.exports = { getHomePageData, saveCustomerDeviceDetails }
