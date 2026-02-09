"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/constants/faq";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-2">
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="group overflow-hidden rounded-lg border border-gray-200 transition-all data-[state=open]:border-gold data-[state=open]:shadow-[0_2px_12px_rgba(184,134,11,0.1)]"
        >
          <Accordion.Trigger className="flex w-full items-center justify-between bg-white px-5 py-4 text-left text-sm font-semibold text-gray-800 transition-colors hover:text-gold">
            {item.question}
            <Plus className="ml-4 h-[22px] w-[22px] shrink-0 text-gold transition-transform duration-300 group-data-[state=open]:rotate-45" />
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_300ms_ease] data-[state=open]:animate-[accordion-down_300ms_ease]">
            <div className="px-5 pb-5 text-sm leading-relaxed text-gray-500">
              {item.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
