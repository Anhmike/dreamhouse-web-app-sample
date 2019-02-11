import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

/*
    Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
    from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
 */
let prettifyProperty = (property) => {
    return {
        id: property.sfid,
        title: property.title__c,
        address: property.address__c,
        city: property.city__c,
        state: property.state__c,
        price: "$" + property.price__c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        bedrooms: property.beds__c,
        bathrooms: property.baths__c,
        description: property.description__c,
        picture: property.picture__c,
        thumbnail: property.thumbnail__c,
        long: property.location__longitude__s,
        lat: property.location__latitude__s,
        tags: property.tags__c,
        broker: property.broker__c_sfid ?
            {
                id: property.broker__c_sfid,
                name: property.broker__c_name,
                title: property.broker__c_title__c,
                picture: property.broker__c_picture__c
            } : {}
    };
};

let prettifyFavorite = (favorite) => {
    return {
        id: favorite.favorite__c_sfid,
        property: prettifyProperty(favorite)
    };
};

@Injectable()
export class PropertyService {

    constructor(public http: Http) { }

    findAll() {
        return this.http.get('/property').map(response => response.json().map(prettifyProperty)).toPromise();
    }

    findByName(key:string) {
        return this.http.get('/property?key=' + key).map(response => response.json().map(prettifyProperty)).toPromise();
    }

    findById(id) {
        return this.http.get('/property/' + id).map(response => prettifyProperty(response.json())).toPromise();
    }

    getFavorites() {
        return this.http.get('/favorite').map(response => response.json().map(prettifyFavorite)).toPromise();
    }

    favorite(property) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/favorite', JSON.stringify({ 'property__c': property.id }), {headers: headers}).toPromise();
    }

    unfavorite(favorite) {
        return this.http.delete('/favorite/' + favorite.id).toPromise();
    }

}
