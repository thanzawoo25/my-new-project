

interface BaseType{
    id?: number,
    name:string
}

export interface Menu extends BaseType{
    price: number
    locationId: number[]
    description?: string
    assetUrl?:string
    isAvailable?:boolean
}

export interface MenuCategory extends BaseType{ }

export interface Addon extends BaseType{
    price: number,
    isAvailable: boolean
    addonCategoriesIds:string[]
}

export interface AddonCategory extends BaseType{
    isRequired:boolean
}

export interface Location extends BaseType{
    companyId?: string
    address:string

}

export interface MenuLocation extends BaseType{
    id: number
    menus_id: number
    locations_id: number
    is_Available:boolean

}

export interface Company extends BaseType {
    address:string
}