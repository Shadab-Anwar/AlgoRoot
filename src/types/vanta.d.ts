declare module "vanta/dist/vanta.net.min" {
    import { Object3D } from "three";
  
    interface VantaOptions {
      el: HTMLElement;
      mouseControls: boolean;
      touchControls: boolean;
      gyroControls: boolean;
      minHeight: number;
      minWidth: number;
      scale: number;
      scaleMobile: number;
      color?: number;
      backgroundColor?: number;
    }
  
    export default class VANTA {
      static NET(options: VantaOptions): Object3D;
    }
  }
  