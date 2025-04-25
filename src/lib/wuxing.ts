export enum YinYang {
    Undefined = "",
    Yin = "阴",
    Yang = "阳",
}
export enum Elements {
    Undefined = "",
    Mu = "木",
    Huo = "火",
    Tu = "土",
    Jin = "金",
    Shui = "水",
}

export enum Relation {
    Undefined = 0,
    ShengWo = 1,
    TongWo = 2,
    WoSheng = 3,
    WoKe = 4,
    KeWo = 5,
}

const relations = new Map<Elements, Map<Elements, Relation>>([
    [Elements.Mu, new Map<Elements, Relation>([
        [Elements.Mu, Relation.TongWo],
        [Elements.Huo, Relation.WoSheng],
        [Elements.Tu, Relation.WoKe],
        [Elements.Jin, Relation.KeWo],
        [Elements.Shui, Relation.ShengWo],
    ])],
    [Elements.Huo, new Map<Elements, Relation>([
        [Elements.Huo, Relation.TongWo],
        [Elements.Tu, Relation.WoSheng],
        [Elements.Jin, Relation.WoKe],
        [Elements.Shui, Relation.KeWo],
        [Elements.Mu, Relation.ShengWo],
    ])],
    [Elements.Tu, new Map<Elements, Relation>([
        [Elements.Tu, Relation.TongWo],
        [Elements.Jin, Relation.WoSheng],
        [Elements.Shui, Relation.WoKe],
        [Elements.Mu, Relation.KeWo],
        [Elements.Huo, Relation.ShengWo],
    ])],
    [Elements.Jin, new Map<Elements, Relation>([
        [Elements.Jin, Relation.TongWo],
        [Elements.Shui, Relation.WoSheng],
        [Elements.Mu, Relation.WoKe],
        [Elements.Huo, Relation.KeWo],
        [Elements.Tu, Relation.ShengWo],
    ])],
    [Elements.Shui, new Map<Elements, Relation>([
        [Elements.Shui, Relation.TongWo],
        [Elements.Mu, Relation.WoSheng],
        [Elements.Huo, Relation.WoKe],
        [Elements.Tu, Relation.KeWo],
        [Elements.Jin, Relation.ShengWo],
    ])],
]);

export function getRelation(wx1: Elements, wx2: Elements): Relation {
    let r = relations.get(wx1);
    return r?.get(wx2) ?? Relation.Undefined;
}