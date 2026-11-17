import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders });
}

export function invalidJson() {
  return json({ message: "Le corps de la requête doit être un JSON valide." }, 400);
}

export function options() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
