import { Stethoscope } from 'lucide-react';
import type { Service } from '@/lib/data/practices';

interface PracticeServicesProps {
  services: Service[];
}

export function PracticeServices({ services }: PracticeServicesProps) {
  if (!services.length) return null;

  return (
    <div className="bg-surface rounded-xl border border-outline-variant p-6">
      <h2 className="text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
        <Stethoscope className="h-5 w-5 text-primary" />
        Services
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-4 bg-surface-container rounded-lg"
          >
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-medium text-on-surface">{service.name}</h3>
              {service.price_from && (
                <span className="text-sm text-primary font-medium whitespace-nowrap">
                  From {service.price_from}
                </span>
              )}
            </div>
            {service.description && (
              <p className="text-sm text-on-surface-variant mt-1">
                {service.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
