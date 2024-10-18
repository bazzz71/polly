// import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
// import { GoogleMap } from '@angular/google-maps';
// import { isPlatformBrowser } from '@angular/common';
// import { environment } from '../../../environments/environment';

// const googleMapsApiKey = environment.googleMapsApiKey;

// @Component({
//   selector: 'app-map',
//   standalone: true,
//   imports: [GoogleMap],
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.scss'],
// })
// export class MapComponent implements OnInit {
//   @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  

//   zoom = 10;
//   center: google.maps.LatLngLiteral = { lat: 53.2297, lng: -0.54220 };
//   options: google.maps.MapOptions = {
//     zoomControl: true,
//     scrollwheel: true,
//     disableDoubleClickZoom: true,
//     streetViewControl: false,
//     maxZoom: 15,
//     minZoom: 1,
//   };

//   drawingManager!: google.maps.drawing.DrawingManager;
//   polygons: google.maps.Polygon[] = [];
//   selectedPolygon: google.maps.Polygon | null = null;

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

//   ngOnInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       this.loadGoogleMapsAPI().then(() => {
//         this.initDrawingManager();
//         this.addDeleteButton();
//       });
//     }
//   }

//   loadGoogleMapsAPI(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       if (typeof google === 'undefined') {
//         const script = document.createElement('script');
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=drawing`;
//         script.defer = true;
//         script.onload = () => {
//           resolve();
//         };
//         script.onerror = reject;
//         document.body.appendChild(script);
//       } else {
//         resolve();
//       }
//     });
//   }

//   initDrawingManager(): void {
//     this.drawingManager = new google.maps.drawing.DrawingManager({
//       drawingMode: google.maps.drawing.OverlayType.POLYGON,
//       drawingControl: true,
//       drawingControlOptions: {
//         position: google.maps.ControlPosition.TOP_CENTER,
//         drawingModes: [google.maps.drawing.OverlayType.POLYGON],
//       },
//       polygonOptions: {
//         strokeColor: '#800080',
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: '#800080',
//         fillOpacity: 0.35,
//         editable: true,
//       },
//     });

//     this.drawingManager.setMap(this.map.googleMap!);

//     google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
//       if (event.type === google.maps.drawing.OverlayType.POLYGON) {
//         const polygon = event.overlay;
//         this.polygons.push(polygon);

//         polygon.setEditable(true);

//         console.log('Polygon completed:', polygon);
//         this.logPolygonBounds(polygon);

//         this.addPolygonEditingListeners(polygon);
//       }
//     });
//   }

//   logPolygonBounds(polygon: google.maps.Polygon): void {
//     const path = polygon.getPath();
//     const coordinates: string[] = [];

//     path.forEach((latLng: google.maps.LatLng) => {
//       coordinates.push(`${latLng.lng()} ${latLng.lat()}`);
//     });

//     const wktPolygon = `POLYGON((${coordinates.join(', ')}))`;
//     console.log('WKT Polygon:', wktPolygon);
//   }

//   addPolygonEditingListeners(polygon: google.maps.Polygon): void {
//     const path = polygon.getPath();
  
//     google.maps.event.addListener(polygon, 'click', () => {
//       this.selectedPolygon = polygon;
//       console.log('Polygon selected for deletion.');
//     });
  
//     google.maps.event.addListener(path, 'set_at', () => {
//       console.log('Polygon vertex moved!');
//       this.logPolygonBounds(polygon);
//     });
  
//     google.maps.event.addListener(path, 'insert_at', () => {
//       console.log('Polygon vertex added!');
//       this.logPolygonBounds(polygon);
//     });
  
//     google.maps.event.addListener(path, 'remove_at', () => {
//       console.log('Polygon vertex removed!');
//       this.logPolygonBounds(polygon);
//     });

//   }

//    addDeleteButton(): void {
//     const controlDiv = document.createElement('div');
//     const controlUI = document.createElement('button');
//     controlUI.style.backgroundColor = '#fff';
//     controlUI.style.border = '2px solid #fff';
//     controlUI.style.borderRadius = '3px';
//     controlUI.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
//     controlUI.style.cursor = 'pointer';
//     controlUI.style.margin = '8px';
//     controlUI.style.padding = '8px';
//     controlUI.textContent = 'Delete Selected Polygon';
//     controlDiv.appendChild(controlUI);

//     controlUI.addEventListener('click', () => {
//       this.deletePolygon();
//     });

//     this.map.googleMap!.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
//   }

//   deletePolygon(): void {
//     if (this.selectedPolygon) {
//       this.selectedPolygon.setMap(null);
//       this.polygons = this.polygons.filter(p => p !== this.selectedPolygon);
//       this.selectedPolygon = null;
//       console.log('Polygon deleted.');
//     } else {
//       console.log('No polygon selected.');
//     }
//   }
  
  
// }
import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

const googleMapsApiKey = environment.googleMapsApiKey;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMap],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  zoom = 10;
  center: google.maps.LatLngLiteral = { lat: 53.2297, lng: -0.54220 };
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    streetViewControl: false,
    maxZoom: 15,
    minZoom: 1,
  };

  drawingManager!: google.maps.drawing.DrawingManager;
  polygons: google.maps.Polygon[] = [];
  selectedPolygon: google.maps.Polygon | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleMapsAPI()
        .then(() => {
          console.log('Google Maps API loaded successfully.');
          this.initDrawingManager();
          this.addDeleteButton();
        })
        .catch((error) => {
          console.error('Error loading Google Maps API', error);
        });
    }
  }

  loadGoogleMapsAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google === 'undefined') {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=drawing`;
        script.defer = true;
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject(new Error('Failed to load Google Maps API'));
        };
        document.body.appendChild(script);
      } else {
        resolve(); // API is already loaded
      }
    });
  }

  initDrawingManager(): void {
    // Check if Google is available before initializing
    if (typeof google === 'undefined') {
      console.error('Google Maps API is not available.');
      return;
    }

    // Initialize the Drawing Manager
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        strokeColor: '#800080', // Purple color for stroke
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#800080', // Purple color for fill
        fillOpacity: 0.35,
        editable: true,
      },
    });

    if (!this.map.googleMap) {
      console.error('GoogleMap is not initialized properly.');
      return;
    }

    this.drawingManager.setMap(this.map.googleMap);

    // Add listener for polygon completion
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        const polygon = event.overlay;
        this.polygons.push(polygon);

        polygon.setEditable(true);

        console.log('Polygon completed:', polygon);
        this.logPolygonBounds(polygon);

        this.addPolygonEditingListeners(polygon);
      }
    });
  }

  logPolygonBounds(polygon: google.maps.Polygon): void {
    const path = polygon.getPath();
    const coordinates: string[] = [];

    path.forEach((latLng: google.maps.LatLng) => {
      coordinates.push(`${latLng.lng()} ${latLng.lat()}`);
    });

    const wktPolygon = `POLYGON((${coordinates.join(', ')}))`;
    console.log('WKT Polygon:', wktPolygon);
  }

  addPolygonEditingListeners(polygon: google.maps.Polygon): void {
    const path = polygon.getPath();

    google.maps.event.addListener(polygon, 'click', () => {
      this.selectedPolygon = polygon;
      console.log('Polygon selected for deletion.');
    });

    google.maps.event.addListener(path, 'set_at', () => {
      console.log('Polygon vertex moved!');
      this.logPolygonBounds(polygon);
    });

    google.maps.event.addListener(path, 'insert_at', () => {
      console.log('Polygon vertex added!');
      this.logPolygonBounds(polygon);
    });

    google.maps.event.addListener(path, 'remove_at', () => {
      console.log('Polygon vertex removed!');
      this.logPolygonBounds(polygon);
    });
  }

  addDeleteButton(): void {
    const controlDiv = document.createElement('div');
    const controlUI = document.createElement('button');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.margin = '8px';
    controlUI.style.padding = '8px';
    controlUI.textContent = 'Delete Selected Polygon';
    controlDiv.appendChild(controlUI);

    controlUI.addEventListener('click', () => {
      this.deletePolygon();
    });

    this.map.googleMap!.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
  }

  deletePolygon(): void {
    if (this.selectedPolygon) {
      this.selectedPolygon.setMap(null);
      this.polygons = this.polygons.filter(p => p !== this.selectedPolygon);
      this.selectedPolygon = null;
      console.log('Polygon deleted.');
    } else {
      console.log('No polygon selected.');
    }
  }
}
