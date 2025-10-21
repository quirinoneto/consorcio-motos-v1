/**
 * Modelo (shape) que representa um consórcio no domínio da aplicação.
 *
 * Campos:
 * - `id`: identificador único do consórcio.
 * - `moto`: descrição / nome do bem (motocicleta) do grupo.
 * - `valorTotal`: valor total do bem (número, em centavos ou unidades conforme convenção do projeto).
 * - `quantidadeParcelas`: número total de parcelas previstas no plano.
 * - `parcelaMensal`: valor da parcela mensal (número).
 * - `prazo`: prazo em meses (geralmente igual a `quantidadeParcelas`).
 * - `status`: estado do grupo — use as strings pré-definidas para manter consistência.
 */
export interface Consorcio {
    /** Identificador único */
    id: number;

    /** Nome ou modelo da motocicleta */
    moto: string;

    /** Valor total do bem */
    valorTotal: number;

    /** Quantidade total de parcelas do plano */
    quantidadeParcelas: number;

    /** Valor estimado da parcela mensal */
    parcelaMensal: number;

    /** Prazo em meses (normalmente igual a quantidadeParcelas) */
    prazo: number;

    /**
     * Status do grupo. Valores permitidos:
     * - 'Disponível'  -> vagas abertas
     * - 'Esgotado'    -> sem vagas
     * - 'Em formação' -> em formação
     */
    status: 'Disponível' | 'Esgotado' | 'Em formação';
}