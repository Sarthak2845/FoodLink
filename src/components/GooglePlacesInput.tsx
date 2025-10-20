import React, { useEffect, useRef, useState } from 'react';

interface GooglePlacesInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  className 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<any>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
        console.warn('Google Maps API key not configured');
        return;
      }

      // Check if Google Maps is already loaded
      if (window.google && window.google.maps && window.google.maps.places) {
        initializeAutocomplete();
        return;
      }

      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      // Set up callback
      (window as any).initMap = () => {
        initializeAutocomplete();
      };

      document.head.appendChild(script);
    };

    const initializeAutocomplete = () => {
      if (inputRef.current && window.google && window.google.maps && window.google.maps.places) {
        const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode'],
          componentRestrictions: { country: 'IN' }
        });

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          if (place.formatted_address) {
            onChange(place.formatted_address);
          }
        });

        setAutocomplete(autocompleteInstance);
      }
    };

    loadGoogleMaps();

    return () => {
      if (autocomplete) {
        window.google?.maps?.event?.clearInstanceListeners(autocomplete);
      }
    };
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Start typing your address..."}
      className={className}
    />
  );
};

export default GooglePlacesInput;