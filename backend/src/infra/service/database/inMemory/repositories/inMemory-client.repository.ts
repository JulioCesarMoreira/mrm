import { Client } from '@application/core/entities';
import { ClientRepository } from '@application/core/repositories';

export class InMemoryClientRepository implements ClientRepository {
  private clients: Client[] = [];

  async create(entity: Omit<Client, 'id'>): Promise<Client> {
    const newClient: Client = {
      ...entity,
      id: this.getNextClientId(),
    };
    this.clients.push(newClient);
    return newClient;
  }

  async get(id: number): Promise<Client | null> {
    const client = this.clients.find((c) => c.id === id);
    return client || null;
  }

  async fetch(
    filters: Omit<Client, 'id' | 'cpfCnpj' | 'tenantId'>,
  ): Promise<Client[]> {
    return this.clients.filter((client) =>
      Object.keys(filters).every((key) => filters[key] === client[key]),
    );
  }

  async update(
    entityId: number,
    entityFields: Omit<Client, 'id' | 'cpfCnpj' | 'tenantId'>,
  ): Promise<Client> {
    const index = this.clients.findIndex((client) => client.id === entityId);
    if (index === -1) {
      throw new Error(`Client with ID ${entityId} not found`);
    }
    const updatedClient = { ...this.clients[index], ...entityFields };
    this.clients[index] = updatedClient;
    return updatedClient;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.clients.findIndex((client) => client.id === id);
    if (index === -1) {
      return false; // Not found
    }
    this.clients.splice(index, 1);
    return true; // Deleted successfully
  }

  private getNextClientId(): number {
    const maxId = this.clients.reduce(
      (max, client) => (client.id > max ? client.id : max),
      0,
    );
    return maxId + 1;
  }
}
