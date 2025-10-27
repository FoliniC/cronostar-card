/**
 * Styles for Temperature Scheduler Card
 * @module styles
 */



import { css } from 'lit';



export const cardStyles = css`

  ha-card {

    padding: 16px;

    height: 100%;

    box-sizing: border-box;

    display: flex;

    flex-direction: column;

    position: relative;

  }

  

  .card-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    padding-bottom: 8px;

  }



  .name {

    font-size: 1.2rem;

    font-weight: 500;

  }



        .menu-button {



          background: none;



          border: none;



          cursor: pointer;



          padding: 0;



          position: absolute;



          top: 12px;



          right: 12px;



        }



        .menu-button svg {



          fill: var(--primary-text-color);



        }



      



        .language-menu mwc-button {



          margin: 0 4px;



        }



    .menu-content {



      position: absolute;



      top: 48px;



      right: 8px;



      background: var(--card-background-color, white);



      border: 1px solid var(--divider-color, #e0e0e0);



      border-radius: 4px;



      z-index: 100;



      box-shadow: 0 2px 4px rgba(0,0,0,0.2);



      padding: 8px 0; /* Add padding for better spacing */



    }



  



    .menu-item-with-switch,



    .menu-item-with-select {



      display: flex;



      justify-content: space-between;



      align-items: center;



      padding: 8px 16px;



      min-height: 48px; /* Ensure consistent height */



    }



  



    .menu-item-with-switch span,



    .menu-item-with-select span {



      flex-grow: 1;



      color: var(--primary-text-color);



    }



  



    .language-menu {



      display: flex;



      align-items: center;



      padding: 0 8px;



    }



  .card-content {

    flex-grow: 1;

    position: relative;

    display: flex;

    flex-direction: column;

  }

  

  .chart-container {

    position: relative;

    flex-grow: 1;

    min-height: 300px;

    user-select: none;

    outline: none;

  }

  

  .loading-overlay {

    position: absolute;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    background: rgba(255, 255, 255, 0.8);

    display: flex;

    justify-content: center;

    align-items: center;

    z-index: 10;

    font-size: 14px;

    color: var(--primary-text-color);

  }

  

    .selection-rect {

  

      position: absolute;

  

      border: 2px dashed var(--primary-color, #03a9f4);

  

      background: rgba(3, 169, 244, 0.15);

  

      display: none;

  

      pointer-events: none;

  

      z-index: 20;

  

      border-radius: 4px;

  

    }

  

  

  

          .anomalous-operation-overlay {

  

  

  

            background: transparent; /* No background */

  

  

  

            color: var(--primary-text-color); /* Use primary text color */

  

  

  

            font-weight: bold;

  

  

  

            text-align: center;

  

  

  

            padding: 20px;

  

  

  

            pointer-events: none; /* Allow interaction with elements beneath */

  

  

  

          }

  

  

  

      

  

  

  

        .anomalous-watermark {

  

  

  

          position: absolute;

  

  

  

          top: 50%;

  

  

  

          left: 50%;

  

  

  

          transform: translate(-50%, -50%) rotate(-45deg);

  

  

  

          font-size: 2em; /* Slightly smaller for less intrusiveness */

  

  

  

          color: rgba(128, 128, 128, 0.1); /* Very light gray, very transparent */

  

  

  

          pointer-events: none;

  

  

  

          user-select: none;

  

  

  

          z-index: 1;

  

  

  

          white-space: nowrap;

  

  

  

          text-shadow: none; /* No shadow */

  

  

  

        }

  

  canvas {

    cursor: ns-resize;

    touch-action: none;

  }

  

  .drag-value-display {

    position: absolute;

    top: 0;

    left: 0;

    background: var(--card-background-color, white);

    border: 1px solid var(--divider-color, #e0e0e0);

    padding: 4px 8px;

    border-radius: 4px;

    display: none;

    z-index: 100;

    font-size: 12px;

    font-weight: 500;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    white-space: nowrap;

  }

  

  .controls {

    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    margin-top: 16px;

    align-items: center;

    padding-top: 12px;

    border-top: 1px solid var(--divider-color, #e0e0e0);

  }

  

  .control-group {

    display: flex;

    align-items: center;

    gap: 8px;

  }

  

  .control-group span {

    font-size: 14px;

    color: var(--primary-text-color);

  }

  

  ha-select {

    min-width: 180px;

  }

  

  mwc-button {

    --mdc-theme-primary: var(--primary-color);

  }

  

  .unsaved-indicator {

    display: inline-flex;

    align-items: center;

    gap: 4px;

    font-size: 12px;

    color: var(--warning-color, #ff9800);

  }

  

  @media (max-width: 600px) {

    .controls {

      flex-direction: column;

      align-items: stretch;

    }

    

    .control-group {

      width: 100%;

      justify-content: space-between;

    }

    

    ha-select {

      width: 100%;

    }

  }

`;
