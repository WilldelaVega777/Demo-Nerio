//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import './Settings.css';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface SettingsProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const Settings: React.FC<SettingsProps> = ({ /* props */ }) => {
  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // Hooks Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // Variables Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // Events Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // UseEffects Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <div className="settings">
      <h1>Configuración</h1>
      <div className="settings-container">
        <section className="settings-section">
          <h2>Configuración de Canal de YouTube</h2>
          <div className="form-group">
            <label>ID del Canal</label>
            <input type="text" placeholder="Ingrese el ID del canal" />
          </div>
          <div className="form-group">
            <label>Nombre del Canal</label>
            <input type="text" placeholder="Ingrese el nombre del canal" />
          </div>
          <button className="save-button">Guardar Configuración</button>
        </section>

        <section className="settings-section">
          <h2>Configuración de Extracción de Datos</h2>
          <div className="form-group">
            <label>Frecuencia de Actualización</label>
            <select>
              <option value="daily">Diario</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
            </select>
          </div>
          <div className="form-group">
            <label>Cantidad de Videos a Analizar</label>
            <input type="number" min="1" max="100" placeholder="Ingrese cantidad" />
          </div>
          <button className="save-button">Guardar Configuración</button>
        </section>
      </div>
    </div>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default Settings;