import {productById} from './catalog.mjs';

export const CART_KEY = 'ants.cart.v1';
export const RESULT_KEY = 'ants.result.v1';
export function quantityValue(value, allowZero = false) {
  if (!/^[0-9]+$/.test(String(value))) return null;
  const n = Number(value);
  return Number.isInteger(n) && n >= (allowZero ? 0 : 1) && n <= 9 ? n : null;
}
export function normalizeItems(items) {
  if (!Array.isArray(items) || items.length > 6) throw new Error('Invalid demo cart');
  const seen = new Set();
  return items.map(item => {
    if (!productById(item?.id) || seen.has(item.id) || typeof item.quantity !== 'number' || quantityValue(item.quantity) === null) throw new Error('Invalid demo item');
    seen.add(item.id);
    return {id:item.id,quantity:item.quantity};
  });
}
export function decodeCart(raw) {
  if (raw === null) return [];
  const data = JSON.parse(raw);
  // Keep the original single-product cart, including an empty legacy cart.
  if (data?.product === 'first-light' && typeof data.quantity === 'number' && quantityValue(data.quantity,true) !== null) return data.quantity ? [{id:'first-light',quantity:data.quantity}] : [];
  if (data?.version !== 2) throw new Error('Invalid demo cart version');
  return normalizeItems(data.items);
}
export const cartCount = items => items.reduce((sum,item) => sum + item.quantity,0);
export const cartTotal = items => items.reduce((sum,item) => sum + productById(item.id).price * item.quantity,0);
export function withQuantity(items,id,quantity) {
  if (!productById(id) || quantityValue(quantity,true) === null) return null;
  const next = items.filter(item => item.id !== id);
  if (quantity) {
    const position = items.findIndex(item => item.id === id);
    next.splice(position < 0 ? next.length : position,0,{id,quantity});
  }
  return normalizeItems(next);
}
export function addItem(items,id,quantity) {
  if (quantityValue(quantity) === null) return null;
  return withQuantity(items,id,(items.find(item => item.id === id)?.quantity ?? 0) + quantity);
}
export function createCartStore(storage, initial = []) {
  let memory = [], persistent = true;
  try {memory = typeof initial === 'number' ? decodeCart(JSON.stringify({product:'first-light',quantity:initial})) : normalizeItems(initial);} catch {}
  function read() {
    if (persistent) {
      try {memory = decodeCart(storage().getItem(CART_KEY));}
      catch (error) {persistent = false; console.warn('Demo cart uses navigation memory.',error.name);}
    }
    return normalizeItems(memory);
  }
  function write(items) {
    memory = normalizeItems(items);
    if (persistent) {
      try {storage().setItem(CART_KEY,JSON.stringify({version:2,items:memory}));}
      catch (error) {persistent = false; console.warn('Demo cart could not be saved.',error.name);}
    }
  }
  return {read,write,get persistent(){return persistent;}};
}
export function decodeResult(raw) {
  if (!raw) return null;
  try {const items = decodeCart(raw); return items.length ? {version:2,items} : null;} catch {return null;}
}
