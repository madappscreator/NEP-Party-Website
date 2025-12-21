/**
 * Membership Card Utilities
 * Helper functions for card generation, export, and validation
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * CR80 Card dimensions
 */
export const CR80_DIMENSIONS = {
  WIDTH_MM: 85.6,
  HEIGHT_MM: 54,
  WIDTH_PX: 720,
  HEIGHT_PX: 420,
  ASPECT_RATIO: 1.586,
  DPI_SCREEN: 96,
  DPI_PRINT: 300,
} as const;

/**
 * Color palette for membership card
 */
export const CARD_COLORS = {
  // Primary Colors
  DARK_RED: '#8B0000',
  RED: '#dc143c',
  SAFFRON: '#ff6b35',
  WHITE: '#ffffff',
  OFF_WHITE: '#fafaf5',
  LIGHT_BEIGE: '#f5f3f0',
  YELLOW_BG: '#fff9e6',
  LIGHT_GRADIENT: '#fffbf0',

  // Accents
  GOLD: '#FFD700',
  DARK_GRAY: '#333',
  MEDIUM_GRAY: '#666',
  LIGHT_GRAY: '#9ca3af',
  BORDER_GRAY: '#e5e7eb',

  // Gradients (for reference)
  HEADER_GRADIENT: 'linear-gradient(135deg, #dc143c 0%, #ff6b35 50%, #fff3cd 100%)',
  FOOTER_GRADIENT: 'linear-gradient(90deg, #8b0000 0%, #dc143c 50%, #ff6b35 100%)',
  AUTHORITY_GRADIENT: 'linear-gradient(135deg, #8b0000 0%, #dc143c 100%)',
} as const;

/**
 * Typography settings
 */
export const CARD_FONTS = {
  FAMILY_TAMIL: '"Noto Serif Tamil", "Catamaran", serif',
  FAMILY_FALLBACK: 'Inter, sans-serif',
  SIZES: {
    PARTY_NAME: 22,
    SECTION_HEADER: 16,
    MEMBER_NAME: 14,
    DETAILS: 13,
    BODY_TEXT: 12,
    SMALL_TEXT: 11,
    FOOTER_TEXT: 10,
    MINIMAL_TEXT: 9,
  },
  WEIGHTS: {
    LIGHT: 300,
    REGULAR: 400,
    MEDIUM: 500,
    SEMI_BOLD: 600,
    BOLD: 700,
    EXTRA_BOLD: 900,
  },
} as const;

/**
 * Export card as high-resolution PNG
 * @param element - DOM element to export
 * @param filename - Output filename
 * @param scale - Scale factor for DPI (default: 3 for 300 DPI)
 */
export async function exportCardAsPNG(
  element: HTMLElement,
  filename: string,
  scale: number = 3
): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${filename}.png`;
    link.click();
  } catch (error) {
    console.error('Error exporting card as PNG:', error);
    throw new Error('Failed to export card as PNG');
  }
}

/**
 * Export multiple cards as a single PDF
 * @param frontElement - Front side DOM element
 * @param backElement - Back side DOM element
 * @param filename - Output filename
 * @param scale - Scale factor for DPI (default: 3 for 300 DPI)
 */
export async function exportCardAsPDF(
  frontElement: HTMLElement,
  backElement: HTMLElement,
  filename: string,
  scale: number = 3
): Promise<void> {
  try {
    // Generate canvas from both sides
    const canvasFront = await html2canvas(frontElement, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    const canvasBack = await html2canvas(backElement, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // Create PDF with A4 size
    const pdf = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'A4',
    });

    // Add front and back sides
    const frontImg = canvasFront.toDataURL('image/png');
    const backImg = canvasBack.toDataURL('image/png');

    // Position front side (top)
    pdf.addImage(frontImg, 'PNG', 10, 10, 190, 120);

    // Position back side (bottom)
    pdf.addImage(backImg, 'PNG', 10, 140, 190, 120);

    // Save PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error exporting card as PDF:', error);
    throw new Error('Failed to export card as PDF');
  }
}

/**
 * Generate QR code data structure
 * @param membershipId - Member ID
 * @param name - Member name
 * @param district - District
 * @param mobile - Mobile number
 */
export function generateQRCodeData(
  membershipId: string,
  name: string,
  district: string,
  mobile: string
): Record<string, string> {
  return {
    member_id: membershipId,
    name,
    district,
    mobile,
  };
}

/**
 * Validate membership data
 * @param data - Member data object
 */
export function validateMembershipData(data: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.membershipId || data.membershipId.trim() === '') {
    errors.push('Membership ID is required');
  }

  if (!data.name || data.name.trim() === '') {
    errors.push('Member name is required');
  }

  if (!data.phone || data.phone.trim() === '') {
    errors.push('Phone number is required');
  }

  if (!data.district || data.district.trim() === '') {
    errors.push('District is required');
  }

  if (data.photoUrl && !isValidImageUrl(data.photoUrl)) {
    errors.push('Invalid photo URL');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate image URL
 * @param url - Image URL to validate
 */
function isValidImageUrl(url: string): boolean {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  } catch {
    return false;
  }
}

/**
 * Format phone number to Indian standard
 * @param phone - Phone number string
 */
export function formatIndianPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Format membership type label
 * @param type - Membership type code
 * @param t - Translation function
 */
export function formatMembershipType(type: string, t?: (key: string) => string): string {
  const types: Record<string, string> = {
    BASIC: 'Basic Member',
    LIFETIME_2000: 'Lifetime Member',
    LIFETIME_5000: 'Lifetime Premium',
    LIFETIME_10000: 'Lifetime Patron',
  };

  if (t) {
    return t(`membership.${type}`) || types[type] || type;
  }

  return types[type] || type;
}

/**
 * Format date to Indian format
 * @param date - Date string or Date object
 */
export function formatDateIndian(date: string | Date | null): string {
  if (!date) return 'N/A';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'N/A';

    return dateObj.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'N/A';
  }
}

/**
 * Get print CSS for card printing
 */
export function getPrintCSS(): string {
  return `
    @media print {
      body {
        background: white;
        margin: 0;
        padding: 10mm;
      }

      .card-controls {
        display: none !important;
      }

      .professional-membership-card {
        box-shadow: none;
        page-break-after: always;
      }

      .card-front,
      .card-back {
        box-shadow: none;
        border: 1px solid #ddd;
        width: 720px;
        height: 420px;
        margin: 0;
        padding: 0;
      }
    }
  `;
}

/**
 * Calculate DPI scale factor
 * @param targetDPI - Target DPI (default: 300)
 * @param baseDPI - Base DPI (default: 96)
 */
export function calculateDPIScale(targetDPI: number = 300, baseDPI: number = 96): number {
  return targetDPI / baseDPI;
}

/**
 * Resize card dimensions
 * @param width - Width in pixels
 * @param height - Height in pixels
 * @param scale - Scale factor
 */
export function resizeCardDimensions(
  width: number,
  height: number,
  scale: number
): { width: number; height: number } {
  return {
    width: width * scale,
    height: height * scale,
  };
}

/**
 * Check if device supports WebGL for canvas rendering
 */
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!ctx;
  } catch {
    return false;
  }
}

/**
 * Get browser compatibility info
 */
export function getBrowserCompatibility(): {
  canExportPNG: boolean;
  canExportPDF: boolean;
  supportsWebGL: boolean;
} {
  return {
    canExportPNG: typeof html2canvas !== 'undefined',
    canExportPDF: typeof jsPDF !== 'undefined',
    supportsWebGL: supportsWebGL(),
  };
}

/**
 * Tamil text utilities
 */
export const TAMIL_TEXT = {
  MEMBERSHIP_ID: 'உறுப்பினை எண்',
  NAME: 'பெயர்',
  FATHER_NAME: 'தந்தை/பாதுகாவலர்',
  DISTRICT: 'மாவட்டம்',
  STATE: 'மாநிலம்',
  PHONE: 'தொலைபேசி',
  WING: 'பிரிவு',
  MEMBER_DETAILS: 'உறுப்பினர் விவரங்கள்',
  PARTY_DETAILS: 'கட்சி விவரங்கள்',
  MEMBER_ADDRESS: 'உறுப்பினை முகவரி',
  PARTY_ADDRESS: 'முகவரி',
  WEBSITE: 'வலைத்தளம்',
  EMAIL: 'மின்னஞ்சல்',
  QR_CODE_LABEL: 'உறுப்பினை ID',
  IDENTITY_CARD: 'அடையாள அட்டை',
} as const;

/**
 * Generate mock member data for testing
 */
export function generateMockMemberData() {
  return {
    membershipId: '13303846289',
    name: 'கிரிஸ்து வில்லிலையம் தேவி',
    fatherName: 'ஒதையாடல்',
    phone: '9876543210',
    photoUrl: null,
    district: 'சென்னை',
    state: 'தமிழ்நாடு',
    constituency: 'திருப்பொலூர்',
    wing: 'மகளிர் பிரிவு',
    membershipType: 'சாதாரண உறுப்பினர்',
    membershipValidUntil: '2025-12-31',
  };
}

/**
 * Memory-efficient canvas rendering for large-scale exports
 */
export async function exportCardAsHighResImage(
  element: HTMLElement,
  filename: string,
  dpi: number = 300
): Promise<void> {
  const scale = dpi / 96;

  try {
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}-${dpi}dpi.png`;
      link.click();

      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }, 'image/png', 0.95);
  } catch (error) {
    console.error('Error exporting high-resolution image:', error);
    throw new Error('Failed to export high-resolution card image');
  }
}
